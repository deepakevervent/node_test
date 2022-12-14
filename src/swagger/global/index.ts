import * as countries from "./countries";
import * as states from "./states";
import * as cities from "./cities";
import * as validatepin from "./validatepin";

export const sw = { ...countries.sw, ...states.sw, ...cities.sw, ...validatepin.sw }