import React from 'react'
import styles from './shapes.module.scss'
import { v4 as uuid } from 'uuid';
import { FiSquare, FiTriangle, FiCircle, FiHexagon, FiStar } from 'react-icons/fi'
import { TbPentagon, TbRectangleVertical, TbOvalVertical, TbOval, TbEgg } from 'react-icons/tb'
import { theme } from 'antd';
import { fabric } from "fabric";
import { convertDataUrlToSvg } from '@util/craftBuilderUtils';
import { star2Url, star3Url } from './shapesUrl';

export const getPolygonVertices = (edges: number, radius: number) => {
    const vertices = [];
    const interiorAngle = (Math.PI * 2) / edges;
    let rotationAdjustment = -Math.PI / 2;
    if (edges % 2 === 0) {
        rotationAdjustment += interiorAngle / 2;
    }
    for (let i = 0; i < edges; i++) {
        // Draw a circle and take the coordinates of the vertices
        const rad = i * interiorAngle + rotationAdjustment;
        vertices.push({
            x: Math.cos(rad) * radius,
            y: Math.sin(rad) * radius,
        });
    }
    return vertices;
};

export const getStarPolygonPoints = (spikeCount, outerRadius, innerRadius) => {
    var rot = Math.PI / 2 * 3;
    var cx = outerRadius;
    var cy = outerRadius;
    var sweep = Math.PI / spikeCount;
    var points = [];
    var angle = 0;

    for (var i = 0; i < spikeCount; i++) {
        var x = cx + Math.cos(angle) * outerRadius;
        var y = cy + Math.sin(angle) * outerRadius;
        points.push({ x: x, y: y });
        angle += sweep;

        x = cx + Math.cos(angle) * innerRadius;
        y = cy + Math.sin(angle) * innerRadius;
        points.push({ x: x, y: y });
        angle += sweep
    }
    return (points);
}

// Function to generate points for a star polygon
function generateStarPoints(cx, cy, spikes, outerRadius, innerRadius) {
    var angle = Math.PI / spikes;
    var points = [];

    for (var i = 0; i < spikes * 2; i++) {
        var radius = i % 2 === 0 ? outerRadius : innerRadius;
        var x = cx + Math.cos(i * angle) * radius;
        var y = cy + Math.sin(i * angle) * radius;
        points.push({ x: x, y: y });
    }

    return points;
}

function Shapes({ canvas, updateLocalCanvas }) {
    const { token } = theme.useToken();
    const defaultPosition = { shadow: '', fontFamily: 'Poppins' };

    const addTriangle = (option = null) => {
        const center = canvas.getCenter();
        const triangle = new fabric.Triangle({
            ...defaultPosition,
            width: 100,
            height: 100,
            fill: '#92706B',
            id: uuid(),
            uid: uuid(),
            name: 'triangle',
            objectCaching: false
        });
        triangle.set({ left: center.left / 2, top: center.top / 2 })
        canvas.add(triangle);
        // if (!option) {
        //     triangle.center();
        // }
        canvas.setActiveObject(triangle);
        updateLocalCanvas(canvas, 'shapes');
    }

    const addCircle = (option = null) => {
        const center = canvas.getCenter();
        const circle = new fabric.Circle({
            ...defaultPosition,
            radius: 50,
            fill: '#57606B',
            id: uuid(),
            uid: uuid(),
            name: 'circle',
            objectCaching: false
        });
        canvas.add(circle);
        circle.set({ left: center.left / 2, top: center.top / 2 })
        canvas.setActiveObject(circle);
        updateLocalCanvas(canvas, 'shapes');
    }

    const addHexagon = (option = null) => {
        const center = canvas.getCenter();
        const polygon = new fabric.Polygon(getPolygonVertices(6, 50), {
            ...defaultPosition,
            ...option,
            fill: '#97e1fd',
            id: uuid(),
            uid: uuid(),
            name: 'hexagon',
            objectCaching: false
        });
        // Set the width and height after creation, otherwise the width and height will become automatic values
        polygon.set({ width: 100, height: 100 });
        canvas.add(polygon);
        polygon.set({ left: center.left / 2, top: center.top / 2 })
        canvas.setActiveObject(polygon);
        updateLocalCanvas(canvas, 'shapes');
    }
    const addPentagon = (option = null) => {
        const center = canvas.getCenter();
        const polygon = new fabric.Polygon(getPolygonVertices(5, 50), {
            ...defaultPosition,
            ...option,
            fill: '#21c3a2',
            id: uuid(),
            uid: uuid(),
            strokeLineJoin: 'round',
            name: 'pentagon',
            objectCaching: false
        });
        // Set the width and height after creation, otherwise the width and height will become automatic values
        polygon.set({ width: 100, height: 100 });
        canvas.add(polygon);
        polygon.set({ left: center.left / 2, top: center.top / 2 })
        canvas.setActiveObject(polygon);
        updateLocalCanvas(canvas, 'shapes');
    }
    const addEllipse = (type) => {
        const center = canvas.getCenter();
        var oval = new fabric.Ellipse({
            left: 100,
            top: 100,
            rx: type == 'v' ? 50 : 100, // Horizontal radius
            ry: type == 'v' ? 100 : 50,  // Vertical radius
            fill: type == 'v' ? '#A8C9EA' : '#B9F3E4',
            id: uuid(),
            uid: uuid(),
            name: 'ellipse',
            objectCaching: false
        });
        canvas.add(oval);
        oval.set({ left: center.left / 2, top: center.top / 2 })
        canvas.setActiveObject(oval);
        updateLocalCanvas(canvas, 'shapes');
    }

    const addRect = (type) => {
        const center = canvas.getCenter();
        const rect = new fabric.Rect({
            ...defaultPosition,
            fill: type == "rect" ? "#5BA199" : '#F57274',
            width: type == 'rect' ? 50 : 100,
            height: 100,
            id: uuid(),
            rx: 10,
            ry: 10,
            name: 'rectangle',
            uid: uuid(),
            statefullCache: true,
            objectCaching: false
        });
        rect.set('patternData', { patternSourceCanvas: null, img: null })
        canvas.add(rect);
        rect.set({ left: center.left / 2, top: center.top / 2 })
        canvas.setActiveObject(rect);
        updateLocalCanvas(canvas, 'shapes');
    }

    const addEgg = () => {
        const center = canvas.getCenter();
        var path = new fabric.Path('M225,75 C225,25 175,10 150,10 C125,10 75,25 75,75 C75,125 150,200 150,200 C150,200 225,125 225,75 z', {
            fill: '#F5F6ED',
            angle: 180,
            uid: uuid(),
            objectCaching: false
        });
        path.set({ left: center.left, top: center.top })
        canvas.add(path);
        canvas.setActiveObject(path);
        updateLocalCanvas(canvas, 'shapes');
    }

    const addStarShape = (type: any) => {
        const shapeType = {
            1: { fill: '#e386c4', spikes: 5, outerRadius: 50, innerRadius: 25 },
            2: { fill: '#E5E3E4', spikes: 7, outerRadius: 70, innerRadius: 35 },
            3: { fill: '#BBC6C8', spikes: 10, outerRadius: 90, innerRadius: 45 },
        }
        const center = canvas.getCenter();
        const polygon = new fabric.Polygon(generateStarPoints(100, 100, shapeType[type].spikes, shapeType[type].outerRadius, shapeType[type].innerRadius), {
            strokeWidth: 0,
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            strokeLineCap: "round",
            strokeLineJoin: "round",
            fill: shapeType[type].fill,
            uid: uuid(),
            id: uuid(),
            angle: 343,
            name: 'star2',
            objectCaching: false
        });
        canvas.add(polygon);
        polygon.set({ left: center.left / 2, top: center.top / 2 })
        canvas.setActiveObject(polygon);
        updateLocalCanvas(canvas, 'shapes');
    }

    const addStarSHape = (option = null) => {
        const center = canvas.getCenter();
        const polygon = new fabric.Polygon(generateStarPoints(100, 100, 10, 90, 45), {
            strokeWidth: 10,
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            strokeLineCap: "round",
            strokeLineJoin: "round",
            fill: '',
            uid: uuid(),
        });
        var dataUrl = polygon.toDataURL()

        convertDataUrlToSvg(dataUrl)
            .then(svgDataUrl => {
                console.log(svgDataUrl);
                // Do something with the SVG Data URL
            })
            .catch(error => {
                console.error(error);
                // Handle error
            });

        canvas.add(polygon);
        polygon.set({ left: center.left / 2, top: center.top / 2 })
        canvas.setActiveObject(polygon);
        updateLocalCanvas(canvas, 'shapes');
    }

    const COMMON_SHAPES = [
        { title: 'Square', action: () => addRect('square'), icon: <FiSquare /> },
        { title: 'Rectangle', action: () => addRect('rect'), icon: <TbRectangleVertical /> },
        { title: 'Triangle', action: addTriangle, icon: <FiTriangle /> },
        { title: 'Circle', action: addCircle, icon: <FiCircle /> },
        { title: 'Oval', action: () => addEllipse('v'), icon: <TbOval /> },
        { title: 'Ellips', action: () => addEllipse('h'), icon: <TbOvalVertical /> },
        { title: 'Egg', action: addEgg, icon: <TbEgg /> },
        { title: 'Hexagon', action: addHexagon, icon: <FiHexagon /> },
        { title: 'Pentagon', action: addPentagon, icon: <TbPentagon /> },
        { title: 'Star 1', action: () => addStarShape(1), icon: <FiStar /> },
        { title: 'Star 2', action: () => addStarShape(2), icon: <img src={star2Url} /> },
        { title: 'Star 3', action: () => addStarShape(3), icon: <img src={star3Url} /> },
        // { title: 'Generate Shape', action: addStarSHape, icon: <img src={star2Url} /> },
    ]

    return (
        <div className={styles.shapesWrap}>
            <div className={styles.title}>Common Shapes</div>
            <div className={styles.shapesList}>
                {COMMON_SHAPES.map((shape) => {
                    return <div key={shape.title}
                        className={`${styles.shapeWrap}`}
                        style={{ background: token.colorBgContainer }}
                        onClick={() => shape.action()}>
                        <div className={styles.iconWrap} style={{ color: token.colorText }}>{shape.icon}</div>
                        <div className={styles.title}>{shape.title}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Shapes