import handlers from "./handlers";
import creater from "./creater";

export * from "./interfaces";

export default {
  ...handlers,
  creater,
  // generator,
};
