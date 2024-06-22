export interface PikpakCaptchaTokenResponse {
  captcha_token: string;
  expires_in: number;
}


export interface PikpakErrorResponse {
  error: string;
  error_code: number;
  error_description: string;

}

export interface PikpakUploadResponse {
  upload_type: string;
  file: {[key: string]: any};
  task: any;
}

export interface PikpakFileResponse {
  kind: string;
  id: string;
  parent_id: string;
  name: string;
  user_id: string;
}
// {
//   "upload_type": "UPLOAD_TYPE_UNKNOWN",
//   "file": {
//   "kind": "drive#folder",
//     "id": "VO-h3m5mZaH2OhmTs5kaH7TJo1",
//     "parent_id": "",
//     "name": "Test Folder",
//     "user_id": "YsjmAR2CMJ-O3ISE",
//     "size": "0",
//     "revision": "0",
//     "file_extension": "",
//     "mime_type": "",
//     "starred": false,
//     "web_content_link": "",
//     "created_time": "2024-06-19T04:39:06.931+08:00",
//     "modified_time": "2024-06-19T04:39:06.931+08:00",
//     "icon_link": "https://static.mypikpak.com/7d6933d5cde34f200366685cba0cbc4592cfd363",
//     "thumbnail_link": "",
//     "md5_checksum": "",
//     "hash": "",
//     "links": {},
//   "phase": "PHASE_TYPE_COMPLETE",
//     "audit": null,
//     "medias": [],
//     "trashed": false,
//     "delete_time": "",
//     "original_url": "",
//     "params": {
//     "platform_icon": "https://static.mypikpak.com/21ecdc2c6b2372cdee91b193df9a6248b885a1b0"
//   },
//   "original_file_index": 0,
//     "space": "",
//     "apps": [],
//     "writable": true,
//     "folder_type": "NORMAL",
//     "collection": null,
//     "sort_name": "",
//     "user_modified_time": "2024-06-19T04:39:06.931+08:00",
//     "spell_name": [],
//     "file_category": "OTHER",
//     "tags": [],
//     "reference_events": [],
//     "reference_resource": null
// },
//   "task": null
// }
