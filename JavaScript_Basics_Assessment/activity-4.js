var students = ['alex', 'chris', 'sarah'];
for(let i=0; i<3; i++){
    let newName = prompt("What name should be added now?");
    students.push(newName);
}
var item;
for(item of students){
    console.log(item);
}