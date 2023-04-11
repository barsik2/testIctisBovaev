const fs = require('fs');
const XLSX = require('xlsx');

const workbook = XLSX.readFile('Sample.xlsx');
const nameList = workbook.SheetNames;
const data = XLSX.utils.sheet_to_json(workbook.Sheets[nameList[0]]);

const output = {};
output.data = data;

const json_output = JSON.stringify(output);

// запись данных из экселя в json
fs.writeFile('student.json', json_output, (err) => {
  if (err) throw err;
  console.log('JSON файл создан!');
});


// фильтрация из JSON файла и вывод в консоль
fs.readFile('student.json', 'utf8', (err, data) => {
  if (err) throw err;
  const obj = JSON.parse(data);
  const users = obj.data;

  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Введите столбец для фильтрации: ', (key) => {
    rl.question('Введите значение по которому фильтровать столбец: ', (value) => {
      const filteredUsers = users.filter(user => user[key] === value);
    //   console.log(filteredUsers); // В виде объектов вывод
      console.table(filteredUsers); // в виде таблице
      rl.close();
    });
  });
});


// ниже представлен код без преобразования эксель таблицы в JSON

/*
    const XLSX = require('xlsx');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });


const workbook = XLSX.readFile('Sample.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];


const users = XLSX.utils.sheet_to_json(worksheet);

readline.question('Введите название столбца для фильтрации: ', column  => {
    readline.question(`Введите значение столбца ${column} для фильтрации: `, value => {
      // Фильтруем пользователей по выбранному значению столбца
      const filteredUsers = users.filter(user => user[column] === value);

      console.table(filteredUsers);

      readline.close();
    });
  });

*/


