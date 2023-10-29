
export type activeObjectsState = {
    eventMode: string,
    isGroup: boolean,
    isMultiple: boolean,
    selectedObject: any[],
    isSelected: boolean
}

export type activeObjectsStateProps = {
    activeObjectsState: activeObjectsState
}