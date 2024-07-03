export interface Imageurl {
  url: string;
}
export default interface ImageListResponse {
  Operation: string;
  Message: string;
  s3_urls: string[];
}
