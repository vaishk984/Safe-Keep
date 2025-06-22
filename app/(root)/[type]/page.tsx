import Card from '@/components/Card';
import Sort from '@/components/Sort';
import { getFiles } from '@/lib/actions/file.actions';
import { getFileTypesParams } from '@/lib/utils';
import { FileType, SearchParamProps } from '@/type';
import { Models } from 'node-appwrite';
import React from 'react';

const page = async (context: SearchParamProps) => {
  const params = await context.params;
  const searchParams = await context.searchParams;

  const type = params?.type || "";
  const searchText = (searchParams?.query as string) || "";
  const sort = (searchParams?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];
  const files = await getFiles({ types, searchText, sort });
  const safeFiles = files ?? { documents: [], total: 0 };

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">{safeFiles.total} files</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden sm:block text-light-200">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>

      {safeFiles.total > 0 ? (
        <section className="file-list">
          {safeFiles.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default page;
