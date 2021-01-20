import Vue from "vue";

/** Cmappax component common definition */
declare class KeyBoardComponent extends Vue {
  /** Install component into Vue */
  static install(vue: typeof Vue): void;
}

/** Component size definition for CmappaxEditorGrid */
declare type ISize = "large" | "medium" | "small" | "mini";

/** IOptions interface */
declare interface IOptions {

}

/** CmappaxEditor Component */
export declare class KeyBoard extends KeyBoardComponent {

}
