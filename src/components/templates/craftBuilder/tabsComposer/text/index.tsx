import React, { useEffect, useState } from 'react';
import { fabric } from "fabric";
import { v4 as uuid } from 'uuid';
import styles from './text.module.scss'
import { TbTextResize, TbTextRecognition } from 'react-icons/tb'
import { MdShortText } from 'react-icons/md'
import { RxTextAlignJustify, RxTextAlignCenter } from 'react-icons/rx'
import { Button, theme } from 'antd';
import Saperator from '@atoms/Saperator';
import FontFaceObserver from 'fontfaceobserver';
import { useAppDispatch } from '@hook/useAppDispatch';
import { showErrorToast } from '@reduxSlices/toast';
import { Input, Space } from 'antd';
import Patterns from '@template/craftBuilder/objectPropertiesEditor/patterns';
import { workspace } from '@template/craftBuilder';
const { Search } = Input;

const TEXT_TYPES = [
    { title: 'Text', icon: <TbTextRecognition /> },
    { title: 'Textarea', icon: <TbTextResize /> },
]

const BODY_TEXT_TYPES = [
    { type: 'Text', title: 'Header', icon: <RxTextAlignCenter /> },
    { type: 'Text', title: 'Body', icon: <RxTextAlignJustify /> },
    { type: 'Text', title: 'Caption', icon: <MdShortText /> },

]

const Text = ({ canvas, updateLocalCanvas }: any) => {
    const [text, setText] = useState('');
    const { token } = theme.useToken();
    const dispatch = useAppDispatch()

    useEffect(() => {
        const font = new FontFaceObserver('Poppins');
        font.load(null, 150000).then(() => {
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    const addTextArea = (text: string, options = {}) => {
        const newTextObject = new fabric.Textbox(text, {
            left: 100,
            top: 100,
            fontSize: 20,
            width: 300,
            textAlign: 'center',
            fontFamily: 'Poppins',
            splitByGrapheme: true,
            uid: uuid(),
            id: uuid(),
            ...options
        });
        canvas.add(newTextObject);
        const center = workspace.getCenterPoint();
        canvas._centerObject(newTextObject, new fabric.Point(workspace.getCenterPoint().x, newTextObject.getCenterPoint().y))
        canvas.setActiveObject(newTextObject)
        updateLocalCanvas(canvas, 'Text');
    };


    const addIText = (text: string, options = {}) => {
        const newTextObject = new fabric.IText(text, {
            left: 100,
            top: 100,
            fontSize: 20,
            width: 400,
            textAlign: 'center',
            fontFamily: 'Poppins',
            splitByGrapheme: true,
            uid: uuid(),
            id: uuid(),
            ...options
        });
        canvas.add(newTextObject);
        canvas._centerObject(newTextObject, new fabric.Point(workspace.getCenterPoint().x, newTextObject.getCenterPoint().y))
        canvas.setActiveObject(newTextObject)
        updateLocalCanvas(canvas, 'Text');
    };

    const addText = (text: string, options = {}) => {
        const newTextObject = new fabric.Text(text, {
            left: 100,
            top: 100,
            fontSize: 20,
            width: 300,
            textAlign: 'center',
            fontFamily: 'Poppins',
            splitByGrapheme: true,
            uid: uuid(),
            id: uuid(),
            ...options
        });
        canvas.add(newTextObject);
        canvas.setActiveObject(newTextObject)
        updateLocalCanvas(canvas, 'Text');
    };


    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setText(event.target.value);
    };

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            if (text) {
                addIText(text);
                setText('');
            } else dispatch(showErrorToast("Please Enter text"))
        }
    };

    const onBodyTypeClick = (type) => {
        const center = canvas.getCenter();
        // font loading for canvas
        const font = new FontFaceObserver('Poppins');
        font.load(null, 150000).then(() => {
            switch (type.title) {
                case 'Header':
                    var left = (center.left / 2) - (canvas.width / 6);
                    var top = 50;
                    addIText('Your header text', { left, top, textAlign: 'center', fontSize: 30 })
                    break;
                case 'Body':
                    var top = center.top / 2;
                    addTextArea('Your description text', { left, top, textAlign: 'center', fontSize: 22 })
                    break;
                case 'Caption':
                    var top = Number(center.top);
                    addTextArea('Your caption text', { left, top, textAlign: 'center', fontSize: 15 })
                    break;
                default:
                    break;
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
            <div className={styles.textWrap}>
                {/* <div className={styles.textTypes}>
                    {TEXT_TYPES.map((type, i) => {
                        return <React.Fragment key={i}>
                            <Button onClick={() => onTextTypeClick(type)} size='large' className={styles.typeWrap} icon={type.icon}>{type.title}</Button>
                        </React.Fragment>
                    })}
                </div> */}
                {/* <Saperator /> */}
                <div className={`${styles.textTypes} ${styles.textBodyType}`}>
                    {BODY_TEXT_TYPES.map((type, i) => {
                        return <div className={`${styles.typeWrap}`} key={i}>
                            <Button className={`${styles.typeButton} ${styles[type.title]}`} onClick={() => onBodyTypeClick(type)} size='large' icon={type.icon} ></Button>
                            <div className={styles.title}>{type.title}</div>
                        </div>
                    })}
                </div>
                <Saperator />
                <Search
                    placeholder="Enter somthing"
                    allowClear
                    enterButton="Add Text"
                    size="middle"
                    value={text}
                    onChange={handleChange}
                    onSearch={(v: any) => handleKeyDown({ key: 'Enter' })}
                />
                <Saperator />
                <div className={styles.textPatterns}>
                    <div className={styles.title} style={{ marginBottom: '10px' }}>Text with pattern</div>
                    add text with pattern examples here
                    {canvas?.getActiveObject() && <Patterns activeObject={canvas?.getActiveObject()} canvas={canvas} updateLocalCanvas={updateLocalCanvas} activeObjectsState={{ eventMode: '', isGroup: false, isMultiple: false, selectedObject: [], isSelected: false }} />}
                </div>
                {/* <input className={styles.inputText} type="text" value={text} onChange={handleChange} onKeyDown={handleKeyDown} /> */}
            </div>
        </div>
    );
};

export default Text;
