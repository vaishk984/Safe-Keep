"use server";
import { RenameFileProps, UploadFileProps } from "@/type";
import { InputFile } from "node-appwrite/file";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";
import { parse } from "path";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

const createQueries = (currentUser: Models.Document) => {
  const queries = [
    Query.or([
      Query.equal('owner', [currentUser.$id]),
      Query.contains('users', [currentUser.email]),
    ]),
  ];

  return queries;
};

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
  const { storage, databases } = await createAdminClient();

  try {

    const inputFile = InputFile.fromBuffer(file, file.name);
    const bucketFile = await storage.createFile(
        appwriteConfig.bucketId, 
        ID.unique(), 
        inputFile,
    );

    const fileDocument = {
        type: getFileType(bucketFile.name).type,
        name: bucketFile.name,
        url: constructFileUrl(bucketFile.$id),
        extension: getFileType(bucketFile.name).extension,
        size: bucketFile.sizeOriginal,
        owner: ownerId,
        accountId,
        users: [],
        bucketFileId: bucketFile.$id,
    };

    const newFile = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersFilesCollectionId,
        ID.unique(),
        fileDocument,
    )
        .catch(async (error: unknown) => {
            await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
            handleError(error, "Failed to create file document")
        });
    
    revalidatePath(path);
    return parseStringify(newFile);

  } catch (error) {
    handleError(error, "Failed to upload file");
  }
};

export const getFiles = async () => {
  const { databases } =  await createAdminClient();

  try{
    const currentUser = await getCurrentUser();
    
    if(!currentUser) throw new Error("User not found");

    const queries = createQueries(currentUser);

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersFilesCollectionId,
      queries,
    );

    return parseStringify(files);
    
  }catch(error){
    handleError(error, "Failed to get the files");
  }
}

export const renameFile = async ({
  fileId,
  name,
  extension,
  path,
}: RenameFileProps) => {
  const { databases } = await createAdminClient();

  try {
    const newName = `${name}.${extension}`;
    const updatedFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersFilesCollectionId,
      fileId,
      {
        name: newName,
      },
    );

    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};