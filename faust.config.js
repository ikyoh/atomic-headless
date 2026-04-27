import { setConfig } from "@faustwp/core";
import possibleTypes from "./possibleTypes.json";
import templates from "./src/wp-templates/index";

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  possibleTypes,
  useGETForQueries: false,
});
