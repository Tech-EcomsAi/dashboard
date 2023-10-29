import { fabric } from 'fabric';

fabric.Object.NUM_FRACTION_DIGITS = 4;

function drawImg(ctx: CanvasRenderingContext2D, left: number, top: number, img: HTMLImageElement, wSize: number, hSize: number, angle: number | undefined) {
  if (angle === undefined) return;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(angle));
  ctx.drawImage(img, -wSize / 2, -hSize / 2, wSize, hSize);
  ctx.restore();
}

const renderIcon = (icon) => {
  return function renderIcon(ctx: CanvasRenderingContext2D, left: number, top: number, styleOverride: any, fabricObject: fabric.Object) {
    drawImg(ctx, left, top, icon, 24, 24, fabricObject.angle);
  }
}

function intervalControl() {
  const verticalImgIcon = document.createElement('img');
  verticalImgIcon.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAxMiAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cmVjdCB4PSI0IiB5PSI0IiB3aWR0aD0iNCIgaGVpZ2h0PSIxNiIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjQuMjUiIHk9IjQuMjUiIHdpZHRoPSIzLjUiIGhlaWdodD0iMTUuNSIgcng9IjEuNzUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjMiIHN0cm9rZS13aWR0aD0iMC41Ii8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iMCIgeT0iMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjI0IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldC8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMC4xMzc2NzQgMCAwIDAgMCAwLjE5MDkzNyAwIDAgMCAwIDAuMjcwODMzIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K';

  const horizontalImgIcon = document.createElement('img');
  horizontalImgIcon.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAyNCAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cmVjdCB4PSIyMCIgeT0iNCIgd2lkdGg9IjQiIGhlaWdodD0iMTYiIHJ4PSIyIiB0cmFuc2Zvcm09InJvdGF0ZSg5MCAyMCA0KSIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMTkuNzUiIHk9IjQuMjUiIHdpZHRoPSIzLjUiIGhlaWdodD0iMTUuNSIgcng9IjEuNzUiIHRyYW5zZm9ybT0icm90YXRlKDkwIDE5Ljc1IDQuMjUpIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2QiIHg9IjAiIHk9IjAiIHdpZHRoPSIyNCIgaGVpZ2h0PSIxMiIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPgo8ZmVPZmZzZXQvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAuMTM3Njc0IDAgMCAwIDAgMC4xOTA5MzcgMCAwIDAgMCAwLjI3MDgzMyAwIDAgMCAwLjE1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==';


  fabric.Object.prototype.controls.ml = new fabric.Control({
    x: -0.5,
    y: 0,
    offsetX: -1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIcon(verticalImgIcon),
  });

  fabric.Object.prototype.controls.mr = new fabric.Control({
    x: 0.5,
    y: 0,
    offsetX: 1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIcon(verticalImgIcon),
  });

  fabric.Object.prototype.controls.mb = new fabric.Control({
    x: 0,
    y: 0.5,
    offsetY: 1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIcon(horizontalImgIcon),
  });

  fabric.Object.prototype.controls.mt = new fabric.Control({
    x: 0,
    y: -0.5,
    offsetY: -1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIcon(horizontalImgIcon),
  });
}

// 顶点
function peakControl() {
  const img = document.createElement('img');
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOSAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8Y2lyY2xlIGN4PSI5Ljk5NjA5IiBjeT0iOSIgcj0iNSIgZmlsbD0id2hpdGUiLz4KPGNpcmNsZSBjeD0iOS45OTYwOSIgY3k9IjkiIHI9IjQuNzUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjMiIHN0cm9rZS13aWR0aD0iMC41Ii8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iMC45OTYwOTQiIHk9IjAiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPgo8ZmVPZmZzZXQvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAuMTM3Njc0IDAgMCAwIDAgMC4xOTA5MzcgMCAwIDAgMCAwLjI3MDgzMyAwIDAgMCAwLjE1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==';

  // Four Corners Icon
  fabric.Object.prototype.controls.tl = new fabric.Control({
    x: -0.5,
    y: -0.5,
    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingEqually,
    render: renderIcon(img),
  });
  fabric.Object.prototype.controls.bl = new fabric.Control({
    x: -0.5,
    y: 0.5,
    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingEqually,
    render: renderIcon(img),
  });
  fabric.Object.prototype.controls.tr = new fabric.Control({
    x: 0.5,
    y: -0.5,
    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingEqually,
    render: renderIcon(img),
  });
  fabric.Object.prototype.controls.br = new fabric.Control({
    x: 0.5,
    y: 0.5,
    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingEqually,
    render: renderIcon(img),
  });
}
// to delete
function deleteControl(canvas: fabric.Canvas) {
  var deleteIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiPjxwYXRoIGZpbGw9IiNlODM2MjgiIGQ9Ik0xMiAwQzUuMzgzIDAgMCA1LjM4MyAwIDEyczUuMzgzIDEyIDEyIDEyIDEyLTUuMzgzIDEyLTEyUzE4LjYxNyAwIDEyIDB6IiBjbGFzcz0iY29sb3JFODM2Mjggc3ZnU2hhcGUiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTIgLjI1YzYuNTc1IDAgMTEuOTI2IDUuMzE2IDExLjk5NCAxMS44NzUgMC0uMDQyLjAwNi0uMDgzLjAwNi0uMTI1IDAtNi42MTctNS4zODMtMTItMTItMTJTMCA1LjM4MyAwIDEyYzAgLjA0Mi4wMDYuMDgzLjAwNi4xMjVDLjA3NCA1LjU2NiA1LjQyNi4yNSAxMiAuMjV6IiBvcGFjaXR5PSIuMiIgY2xhc3M9ImNvbG9yRkZGIHN2Z1NoYXBlIj48L3BhdGg+PHBhdGggZD0iTTEyIDIzLjc1QzUuNDI1IDIzLjc1LjA3NCAxOC40MzQuMDA2IDExLjg3NWMwIC4wNDItLjAwNi4wODMtLjAwNi4xMjUgMCA2LjYxNyA1LjM4MyAxMiAxMiAxMnMxMi01LjM4MyAxMi0xMmMwLS4wNDItLjAwNi0uMDgzLS4wMDYtLjEyNUMyMy45MjYgMTguNDM0IDE4LjU3NCAyMy43NSAxMiAyMy43NXoiIG9wYWNpdHk9Ii4xIiBmaWxsPSIjMDAwMDAwIiBjbGFzcz0iY29sb3IwMDAgc3ZnU2hhcGUiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTYuMDg2IDYuNUwxMiAxMC41ODYgNy45MTQgNi41IDYuNSA3LjkxNCAxMC41ODYgMTIgNi41IDE2LjA4NiA3LjkxNCAxNy41IDEyIDEzLjQxNGw0LjA4NiA0LjA4NiAxLjQxNC0xLjQxNEwxMy40MTQgMTIgMTcuNSA3LjkxNHoiIGNsYXNzPSJjb2xvckZGRiBzdmdTaGFwZSI+PC9wYXRoPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjEzLjExNyIgeDI9IjE5LjI2OCIgeTE9IjEzLjExNyIgeTI9IjE5LjI2OCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1vcGFjaXR5PSIuMSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgY2xhc3M9InN0b3BDb2xvcjAwMDAwMCBzdmdTaGFwZSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1vcGFjaXR5PSIwIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBjbGFzcz0ic3RvcENvbG9yMDAwMDAwIHN2Z1NoYXBlIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48cGF0aCBmaWxsPSJ1cmwoI2EpIiBkPSJNMTcuNSA3LjkxNEwxMy40MTQgMTJsNC4wODYgNC4wODYtMS40MTQgMS40MTRMMTIgMTMuNDE0IDcuOTE0IDE3LjVsNi4yODkgNi4yODhhMTIuMDIgMTIuMDIgMCAwIDAgOS41ODUtOS41ODVMMTcuNSA3LjkxNHoiPjwvcGF0aD48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIxLjEyNSIgeDI9IjIyLjg3NSIgeTE9IjYuOTI5IiB5Mj0iMTcuMDcxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9Ii4yIiBjbGFzcz0ic3RvcENvbG9yRkZGIHN2Z1NoYXBlIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjAiIGNsYXNzPSJzdG9wQ29sb3JGRkYgc3ZnU2hhcGUiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxwYXRoIGZpbGw9InVybCgjYikiIGQ9Ik0xMiAwQzUuMzgzIDAgMCA1LjM4MyAwIDEyczUuMzgzIDEyIDEyIDEyIDEyLTUuMzgzIDEyLTEyUzE4LjYxNyAwIDEyIDB6Ij48L3BhdGg+PC9zdmc+';
  const img = document.createElement('img');
  img.src = deleteIcon;

  // delete selected elements
  function deleteObject(mouseEvent: MouseEvent, target: fabric.Transform) {
    if (target.action === 'rotate') return true;
    const activeObject = canvas.getActiveObjects();
    if (activeObject) {
      activeObject.map((item) => canvas.remove(item));
      canvas.requestRenderAll();
      canvas.discardActiveObject();
    }
    return true;
  }

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon(img),
    cornerSize: 24
  });
}

// to clone
function cloneControl(canvas: fabric.Canvas, token) {
  let image = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="256" height="256"><path d="M256 6C117.9 6 6 117.9 6 256s111.9 250 250 250 250-111.9 250-250S394.1 6 256 6zm62.4 351.5c0 12.9-10.5 23.4-23.4 23.4H154.4c-12.9 0-23.4-10.5-23.4-23.4V216.9c0-12.9 10.5-23.4 23.4-23.4h23.4V295c0 21.6 17.6 39.1 39.1 39.1h101.5v23.4zM381 295c0 12.9-10.5 23.4-23.4 23.4H216.9c-12.9 0-23.4-10.5-23.4-23.4V154.4c0-12.9 10.5-23.4 23.4-23.4h140.7c12.9 0 23.4 10.5 23.4 23.4V295z" fill="#001529" class="color000 svgShape"></path></svg>`
  const buff = new Buffer(image);
  const base64data = buff.toString('base64');

  let icon = `data:image/svg+xml;base64,${base64data}`;
  let cloneIcon = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI4IDI4IiB2aWV3Qm94PSIwIDAgMjggMjgiIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2Ij48c3dpdGNoPjxnIGZpbGw9IiMwMDAwMDAiIGNsYXNzPSJjb2xvcjAwMCBzdmdTaGFwZSI+PHBhdGggZmlsbD0iIzFlNDc3NyIgZD0iTTIxLjUsMThoLTdDMTIsMTgsMTAsMTYsMTAsMTMuNXYtN0MxMCw0LDEyLDIsMTQuNSwyaDdDMjQsMiwyNiw0LDI2LDYuNXY3QzI2LDE2LDI0LDE4LDIxLjUsMTh6IiBjbGFzcz0iY29sb3IxZTQ3Nzcgc3ZnU2hhcGUiPjwvcGF0aD48cGF0aCBmaWxsPSIjNmFhZmU2IiBkPSJNMTMuNSwyNmgtN0M0LDI2LDIsMjQsMiwyMS41di03QzIsMTIsNCwxMCw2LjUsMTBIN2MwLjYsMCwxLDAuNCwxLDFzLTAuNCwxLTEsMUg2LjVDNS4xLDEyLDQsMTMuMSw0LDE0LjV2NwoJCQkJQzQsMjIuOSw1LjEsMjQsNi41LDI0aDdjMS40LDAsMi41LTEuMSwyLjUtMi41VjIxYzAtMC42LDAuNC0xLDEtMXMxLDAuNCwxLDF2MC41QzE4LDI0LDE2LDI2LDEzLjUsMjZ6IiBjbGFzcz0iY29sb3I2YWFmZTYgc3ZnU2hhcGUiPjwvcGF0aD48L2c+PC9zd2l0Y2g+PC9zdmc+`;
  const img = document.createElement('img');
  img.src = icon;

  const cloneObject = (eventData, transform) => {
    var target = transform.target;
    var canvas = target.canvas;
    target.clone(function (cloned) {
      cloned.left += 10;
      cloned.top += 10;
      canvas.add(cloned);
    });
  }

  // clone selected elements
  fabric.Object.prototype.controls.clone = new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: -16,
    cursorStyle: 'pointer',
    mouseUpHandler: cloneObject,
    render: renderIcon(img),
    cornerSize: 24
  });
}

// to rotate
function rotationControl() {
  const img = document.createElement('img');
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iNSIgZmlsbD0id2hpdGUiLz4KPGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjQuNzUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjMiIHN0cm9rZS13aWR0aD0iMC41Ii8+CjwvZz4KPHBhdGggZD0iTTEwLjgwNDcgMTEuMTI0Mkw5LjQ5OTM0IDExLjEyNDJMOS40OTkzNCA5LjgxODg1IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik02Ljk0ODU2IDYuNzI2MDdMOC4yNTM5MSA2LjcyNjA3TDguMjUzOTEgOC4wMzE0MiIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNOS42OTUxNyA2LjkyMjY3QzEwLjAwNyA3LjAzMzAxIDEwLjI4NTggNy4yMjA1NCAxMC41MDU1IDcuNDY3NzZDMTAuNzI1MiA3LjcxNDk3IDEwLjg3ODcgOC4wMTM4MiAxMC45NTE3IDguMzM2NDJDMTEuMDI0NyA4LjY1OTAyIDExLjAxNDggOC45OTQ4NSAxMC45MjI5IDkuMzEyNThDMTAuODMxIDkuNjMwMzEgMTAuNjYwMSA5LjkxOTU4IDEwLjQyNjIgMTAuMTUzNEw5LjQ5NzAxIDExLjA0MjFNOC4yNTc5MiA2LjcyNjA3TDcuMzA5MzcgNy43MzU1NEM3LjA3NTQzIDcuOTY5MzYgNi45MDQ1NCA4LjI1ODYzIDYuODEyNjQgOC41NzYzNkM2LjcyMDczIDguODk0MDggNi43MTA4MSA5LjIyOTkyIDYuNzgzODEgOS41NTI1MUM2Ljg1NjggOS44NzUxMSA3LjAxMDMyIDEwLjE3NCA3LjIzMDA1IDEwLjQyMTJDNy40NDk3OCAxMC42Njg0IDcuNzI4NTUgMTAuODU1OSA4LjA0MDM2IDEwLjk2NjMiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iMCIgeT0iMCIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldC8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMC4xMzc2NzQgMCAwIDAgMCAwLjE5MDkzNyAwIDAgMCAwIDAuMjcwODMzIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K';

  fabric.Object.prototype.controls.mtr = new fabric.Control({
    x: 0,
    y: 0.5,
    cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    offsetY: 30,
    // withConnecton: false,
    actionName: 'rotate',
    render: renderIcon(img),
  });
}

function initControls(canvas: fabric.Canvas, token: any) {
  // deleteControl(canvas);
  // //apex icon
  peakControl();
  // //middle horizontal bar icon
  intervalControl();
  // // Rotate icon
  rotationControl();
  // clone icon
  // cloneControl(canvas, token)

  // selected style
  fabric.Object.prototype.set({
    transparentCorners: false,
    borderColor: token.colorPrimary,
    cornerColor: '#FFF',
    borderScaleFactor: 2,
    cornerStyle: 'circle',
    cornerStrokeColor: token.colorPrimary,
    borderOpacityWhenMoving: 1,
  });
  // fabric.Textbox.prototype.controls = fabric.Object.prototype.controls;
}

export default initControls;
