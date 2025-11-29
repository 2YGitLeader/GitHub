function removeElement(array, item) {
    const index = array.indexOf(item);
    if (index !== -1) {
        array.splice(index, 1);
    }
}
const array1 = [1, 2, 3, 4, 5, 6, 7];
removeElement(array1, 5);
console.log(array1);
const array2 = ['Kiev', 'Beijing', 'Lima', 'Saratov'];
removeElement(array2, 'Lima');
removeElement(array2, 'Berlin'); 
console.log(array2); 
function removeElements(array, ...items) {
    for (const item of items) {
        let index;
        while ((index = array.indexOf(item)) !== -1) {
            array.splice(index, 1);
        }
    }
}
const array3 = [1, 2, 3, 4, 5, 6, 7];
removeElements(array3, 5, 1, 6);
console.log(array3); 
const array4 = ['Kiev', 'Beijing', 'Lima', 'Saratov'];
removeElements(array4, 'Lima', 'Berlin', 'Kiev');
console.log(array4);
function unique(array) {
    return [...new Set(array)]; 
}
const result3 = unique([2, 1, 1, 3, 2]);
console.log(result3);
const result4 = unique(['top', 'bottom', 'top', 'left']);
console.log(result4);
function difference(array1, array2) {
    const set2 = new Set(array2);
    return array1.filter(item => !set2.has(item));
}
const array5 = [7, -2, 10, 5, 0];
const array6 = [0, 10];
const result5 = difference(array5, array6);
console.log(result5);
const array7 = ['Beijing', 'Kiev'];
const array8 = ['Kiev', 'London', 'Baghdad'];
const result6 = difference(array7, array8);
console.log(result6);