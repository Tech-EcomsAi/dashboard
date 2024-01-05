import { SECTIONS_LIST } from "@constant/builder";
import { NAVIGATION_COMPONENTS_LIST } from "./constants";
import NavigationOneComponent from "./navigationOne/component";

const NavigationComponentsList = {
    [`${SECTIONS_LIST.NAVIGATION}#${NAVIGATION_COMPONENTS_LIST.NAVIGATION_ONE}`]: NavigationOneComponent
}
export default NavigationComponentsList;
