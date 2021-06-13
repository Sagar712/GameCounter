if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(
        registration => {
            console.log("SW registered");
            console.log(registration);
        }
    ).catch(error => {
        console.log("SW failed");
    })
}


let ca = document.querySelectorAll('td');
const tbl = document.querySelector('.tableOfCon');
let rows = 0;
let cols = 0;

let Matrix = {

}

if(localStorage.getItem('GamePointData') != null){
    let obje = JSON.parse(localStorage.getItem('GamePointData'));
    for(let i=0; i< obje.rows; i++)
        addRow();
    for(let i=0; i< obje.cols-1; i++)
        addCol();
    Matrix = obje.matrix;
    if(Matrix!=null)
        InjectData();
}

console.log(tbl.innerHTML);

function StoreCurrentState() {
    ca = document.querySelectorAll('td');
    let count = 0;
    let temp = [];
    for(r=1; r<=rows; r++){
        for(c=1; c<=cols; c++){
            temp.push(ca[count++].innerText);
        }
        Matrix[r] = temp;
        temp = [];
    }
    console.log(Matrix);
    
}

function SaveToStorage() {
    let wholeDb = {
        matrix : Matrix,
        rows:rows,
        cols:cols
    }
    localStorage.setItem('GamePointData',JSON.stringify(wholeDb));
}

function DelStorage() {
    if(confirm("Are You sure")){
        localStorage.removeItem('GamePointData');
    }
}

function addRow() {
    rows++;
    if(cols==0)
        cols++;  
    tbl.innerHTML = PrintTable(rows, cols);
    InjectData();
}
function addCol() {
    cols++;
    if(rows==0)
        rows++;
        
    tbl.innerHTML = PrintTable(rows, cols);
    InjectData();
}


function PrintTable(rowNo, colNo) {
    let TableStr = "";
    let j=1;
    for(let r=1; r<=rowNo; r++){
        TableStr = TableStr.concat('<tr>');
        for(let c=1; c<=colNo; c++){
            TableStr = TableStr.concat(`<td></td>`);
        }
        TableStr = TableStr.concat('</tr>');
    }
    return TableStr;
}

function InjectData() {
    console.log("hello");
    ca = document.querySelectorAll('td');
    let j=0;
    for(r=1; r<=rows; r++){
        let Temparr = Matrix[r];
        if(Temparr!=null){
            for(c=0; c<cols; c++){
                if(Temparr[c] != undefined)
                   ca[j++].innerText = Temparr[c];
                else
                    j++;
            }
        }
    }
}



//formula a+n*c     a- first row num, n-nth row, c=no of columns

