import Vue from "vue";

/** KeyBoard component common definition */
declare class KeyBoardComponent extends Vue {
  /** Install component into Vue */
  static install(vue: typeof Vue): void;
}

/** KeyBoard Component */
export declare class KeyBoard extends KeyBoardComponent {
  /** Binding value */
  value: string | number;

  /** theme color - support rgb or hex - default("#eaa050") */
  color: string;

  /** mode list - support symbol or handwrite keyboard - default(["handwrite", "symbol"]) */
  modeList: ("handwrite" | "symbol")[];

  /** is blur status hide - default(true) */
  blurHide: boolean;

  /** Whether to show the drag handle - default(true)  */
  showHandleBar: boolean;

  /** handwrite interface */
  handApi: string;

  /** transition className */
  animateClass: string;

  /** darg Handle text */
  dargHandleText: string;

  /**
   * key change
   */
  keyChange(value: string): void;
}
