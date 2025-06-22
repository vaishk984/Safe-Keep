"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { useDebounce } from "use-debounce";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const router = useRouter();
  const pathname = usePathname();

  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setOpen(false);
        router.push(pathname); // clean query param from URL
        return;
      }

      const files = await getFiles({ types: [], searchText: debouncedQuery });
      if (!files || !files.documents) {
        setResults([]);
        return;
      }

      setResults(files.documents);

      setOpen(true);
    };

    fetchFiles();
  }, [debouncedQuery, pathname, router]);

  useEffect(() => {
    if (!searchQuery) setQuery("");
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);

    const basePath =
      file.type === "video" || file.type === "audio"
        ? "media"
        : `${file.type}s`;

    router.push(`/${basePath}?query=${query}`);
  };

  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image src="/search.svg" alt="Search" width={24} height={24} />
        <Input
          value={query}
          placeholder="Search..."
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
        />

        {open && (
          <ul className="search-result">
            {results.length > 0 ? (
              results.map((file) => (
                <li
                  key={file.$id}
                  className="flex items-center justify-between"
                  onClick={() => handleClickItem(file)}
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className="subtitle-2 line-clamp-1 text-light-100">
                      {file.name}
                    </p>
                  </div>

                  <FormattedDateTime
                    date={file.$createdAt}
                    className="caption line-clamp-1 text-light-200"
                  />
                </li>
              ))
            ) : (
              <p className="empty-result">No files found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
