"use client";
import { useMutation } from "convex/react";
import { useUploadFiles, UploadSpinner } from "@xixixao/uploadstuff/react";
import { UploadFileResponse } from "@xixixao/uploadstuff";
import { api } from "../../convex/_generated/api";
import React, { useState, useRef } from "react";
import { Id } from "../../convex/_generated/dataModel";

const enum Privacy {
  Public = "public",
  Private = "private",
}
const sampleMediaData = {
  user: "jn70cn957crtx61qvh6wm1nv4d6mxfnz" as Id<"user">,
  otherUsers: [],
  genres: ["jd71d9kyxbzhfvrp96bqbrwmxh6mwwr3" as Id<"genre">],
  name: "Best Hiphop",
  dateTime: 100,
  privacy: Privacy.Public,
  comments: [],
  views: 0,
  likes: 0,
};

export function UploadMediaButton() {
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);
  const mediaInput = useRef<HTMLInputElement>(null);
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const getMediaUrl = useMutation(api.media.getMediaUrl);
  const saveMedia = useMutation(api.media.post);
  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    const storageId = (uploaded[0].response as any).storageId;
    const fileUrl = await getMediaUrl({ storageId });
    await saveMedia({
      ...sampleMediaData,
      storageId,
      fileUrl,
    });
  };

  const { startUpload, isUploading } = useUploadFiles(generateUploadUrl, {
    onUploadComplete: saveAfterUpload,
    onUploadError: (err) => {
      console.log(err);
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        startUpload([selectedMedia]);
      }}
    >
      <input
        type="file"
        ref={mediaInput}
        onChange={(event) => setSelectedMedia(event.target.files![0])}
      />
      <input type="submit" value="Submit" disabled={selectedMedia === null || isUploading} />
    </form>
  );
}
