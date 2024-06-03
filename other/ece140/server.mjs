import { convertWordFiles } from 'convert-multiple-files';
import * as path from 'path';

async function test() {
  // Return promise => convertWordFiles(path of the file to be converted, convertTo, outputDir)
  const pathOutput = await convertWordFiles('chapter/Problems/Prob0501.doc', 'pdf', "chapter/test.pdf");
  console.log(pathOutput);
}

await test();