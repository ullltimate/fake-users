import { faker } from "@faker-js/faker";

const arrPl = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 
'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ź', 'ż'];
const arrRu = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о',
'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];
const arrUk = ['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к', 'л',
'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я'];
const arrNum = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function deleteSymbol(str: string){
    let array = str.split('');
    array.splice(faker.helpers.arrayElement(Array.from({ length: array.length }, (e,i) =>  i )), 1);
    return array.join('');
}

export function addSymbol(str: string, region: string, bool: boolean){
    let array = str.split('');
    if(bool){
        array.splice(faker.helpers.arrayElement(Array.from({ length: array.length }, (e,i) =>  i )), 0, faker.helpers.arrayElement(arrNum));
    } else {
        if (region === 'pl'){
            array.splice(faker.helpers.arrayElement(Array.from({ length: array.length }, (e,i) =>  i )), 0, faker.helpers.arrayElement(arrPl));
        } else if(region === 'ru'){
            array.splice(faker.helpers.arrayElement(Array.from({ length: array.length }, (e,i) =>  i )), 0, faker.helpers.arrayElement(arrRu));
        } else if(region === 'uk'){
            array.splice(faker.helpers.arrayElement(Array.from({ length: array.length }, (e,i) =>  i )), 0, faker.helpers.arrayElement(arrUk));
        }
    }
    return array.join('');
}

export function swapSymbol(str: string){
    let array = str.split('');
    let random = faker.helpers.arrayElement(Array.from({ length: array.length-1 }, (e,i) =>  i+1 ));
    let elem = array[random]
    array[random] = array[random+1];
    array[random+1] = elem;
    return array.join('');
}

export function randomError(str: string, region: string, bool: boolean){
    let arrayError = [deleteSymbol(str), addSymbol(str, region, bool), swapSymbol(str)]
    let randomError = faker.helpers.arrayElement(arrayError);
    return randomError
}

export function makeMistakes(str: string, region: string, bool: boolean, count: number){
    let countMistake: number = Math.trunc(count);
    let prob: number = count - countMistake;
    if (countMistake>10) countMistake = 10;
    for(let i=0; i<countMistake; i++){
        str = randomError(str, region, bool);
    }
    faker.helpers.maybe(() => {str = randomError(str, region, bool)}, { probability: prob })
    return str
}