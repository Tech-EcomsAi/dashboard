import HomePageSectionsList from '@organisms/sections/homePage';
import { v4 as uuid } from 'uuid';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
/**
 * Moves an item from one list to another list.
 */
const getPage = (unid: any) => {
    if (unid == 1) {
        return HomePageSectionsList;
    }
}

const copy = (destination, droppableSource, droppableDestination) => {

    const pageUnid = `${droppableSource.index}`[0];
    const sectionUnid = `${droppableSource.index}`[1];

    const page = getPage(pageUnid);
    const sectionsList: any[] = page.find((s: any) => s.unid == Number(`${pageUnid}${sectionUnid}`)).sectionConfigsList

    const sourceClone = Array.from(sectionsList);
    const destClone = Array.from(destination);
    const item: any = sourceClone.find((s) => s.unid == droppableSource.index);
    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
};

export { copy, move, reorder };
