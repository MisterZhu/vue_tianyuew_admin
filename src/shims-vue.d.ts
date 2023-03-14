/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
// interface ImportMeta {
//     readonly env: {
//       [x: string]: any;
//       readonly VUE_APP_BASE_API: string;
//       readonly VUE_APP_USER_LOGIN: string;
//       // 其他环境变量
//     }
//   }
// interface ImportMeta {
//   env: Record<string, string>;
// }
// declare interface ImportMetaEnv {
//   VUE_APP_BASE_API: string;
//   VUE_API_USER_LOGIN: string;
// }