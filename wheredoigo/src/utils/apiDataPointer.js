export const createPointer = (className, objectId) => {
    return { __type: 'Pointer', className, objectId };
};