import { combineReducers } from "@reduxjs/toolkit";
import { auth } from "./auth";
import { loader } from "./loader";
import { alert } from "./alert";
import { toast } from "./toast";
import { activeEditorComponent } from "./activeEditorComponent";
import { builderState } from "./siteBuilderState";
import { clientThemeConfig } from "./clientThemeConfig";

const rootReducer = combineReducers({
  [auth.name]: auth.reducer,
  [loader.name]: loader.reducer,
  [alert.name]: alert.reducer,
  [toast.name]: toast.reducer,
  [builderState.name]: builderState.reducer,
  [activeEditorComponent.name]: activeEditorComponent.reducer,
  [clientThemeConfig.name]: clientThemeConfig.reducer
});
export default rootReducer;