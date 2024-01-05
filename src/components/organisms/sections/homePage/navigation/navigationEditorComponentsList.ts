import { SECTIONS_LIST } from "@constant/builder";
import { NAVIGATION_COMPONENTS_LIST } from "./constants";
import NavigationOneEditorComponent from "./navigationOne/editor";

const NavigationEditorComponentsList = {
    [`${SECTIONS_LIST.NAVIGATION}#${NAVIGATION_COMPONENTS_LIST.NAVIGATION_ONE}`]: NavigationOneEditorComponent
}
export default NavigationEditorComponentsList;
