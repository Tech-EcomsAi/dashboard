import hotkeys from 'hotkeys-js';
import { fabric } from "fabric";
import { HOTKEYS_MOVE_PIXELS } from '@constant/craftBuilder';
import { getIsGroup } from './handleSelctionEvent';
import { group, unGroup } from './tabsComposer/operations/grouping';
import { checkNonRestrictedObject } from '@util/craftBuilderUtils';

const keyNames = {
  lrdu: 'left,right,down,up',
  backspace: 'backspace',
  ctrlc: 'ctrl+c',
  ctrlv: 'ctrl+v',
  ctrla: 'ctrl+a',
  cmda: 'cmd+a',
  ctrlg: 'ctrl+g',
  cmdg: 'cmd+g',
  ctrlundo: 'ctrl+z',
  cmdzundo: 'cmd+z',
  ctrlredo: 'cmd+Shift+Z',
  cmdredo: 'cmd+Shift+Z',
};

function copyElement(canvas: fabric.Canvas) {
  let copyEl: fabric.ActiveSelection | fabric.Object | null;

}

function initHotkeys(canvas: fabric.Canvas, updateLocalCanvas: any) {
  // delete shortcut
  hotkeys(keyNames.backspace, () => {
    const activeObject = canvas.getActiveObjects();
    if (activeObject) {
      activeObject.map((item) => canvas.remove(item));
      canvas.discardActiveObject();
      updateLocalCanvas(canvas, 'initHotkeys')
    }
  });

  // hotkeys(`${keyNames.ctrlundo},${keyNames.cmdzundo}`, (e) => {
  //   console.log("keyNames.ctrlundo")
  // });

  // hotkeys(`${keyNames.ctrlredo},${keyNames.cmdredo}`, (e) => {
  //   console.log("keyNames.cmdredo")
  // });

  hotkeys(`${keyNames.cmda},${keyNames.ctrla}`, () => {
    canvas.discardActiveObject();
    if (canvas.getObjects().length) {
      const Objects = canvas.getObjects().filter((obj) => checkNonRestrictedObject(obj));
      if (Objects.length) {
        var sel = new fabric.ActiveSelection(Objects, {
          canvas: canvas,
        });
        canvas.setActiveObject(sel);
        updateLocalCanvas(canvas, 'initHotkeys')

      }
    }
  });

  //group object
  hotkeys(`${keyNames.cmdg}`, () => {
    const activeObject = canvas.getActiveObjects();
    if (activeObject) {
      if (getIsGroup(activeObject)) {
        unGroup(canvas)
      } else {
        group(canvas)
      }
      updateLocalCanvas(canvas, 'initHotkeys')
    }
  });

  // mobile shortcuts
  hotkeys(keyNames.lrdu, (event, handler) => {
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    switch (handler.key) {
      case 'left':
        if (activeObject.left === undefined) return;
        activeObject.set('left', activeObject.left - HOTKEYS_MOVE_PIXELS);
        break;
      case 'right':
        if (activeObject.left === undefined) return;
        activeObject.set('left', activeObject.left + HOTKEYS_MOVE_PIXELS);
        break;
      case 'down':
        if (activeObject.top === undefined) return;
        activeObject.set('top', activeObject.top + HOTKEYS_MOVE_PIXELS);
        break;
      case 'up':
        if (activeObject.top === undefined) return;
        activeObject.set('top', activeObject.top - HOTKEYS_MOVE_PIXELS);
        break;
      default:
    }
    updateLocalCanvas(canvas, 'initHotkeys')
  });

  // copy and paste

  let copyEl: fabric.ActiveSelection | fabric.Object | null;
  hotkeys(keyNames.ctrlc, () => {
    const activeObject = canvas.getActiveObject();
    copyEl = activeObject;
  });

  // paste
  hotkeys(keyNames.ctrlv, () => {
    if (copyEl) {
      canvas.clone(copyEl);
      updateLocalCanvas(canvas, 'initHotkeys')
    }
  });
}

export default initHotkeys;
export { keyNames, hotkeys };
