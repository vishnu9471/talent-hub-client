export const getPlayableVideoUrl = (url) => {
  if (!url) return "";

  if (
    url.includes("res.cloudinary.com") &&
    url.includes("/video/upload/")
  ) {
    return url.replace(
      "/video/upload/",
      "/video/upload/f_mp4,vc_h264,ac_aac/"
    );
  }

  return url;
};