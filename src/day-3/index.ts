import fs from 'fs';
import path from 'path';

const main = async () => {
    const code = await (await fs.promises.readFile(path.join(__dirname, './codes.txt'))).toString().split('\n');
    const counts = new Map();
    code.slice(10).forEach((num: string) => {
        num.split("").map(n => parseInt(n)).forEach((n, i) => {
            // 0,1,2,3,4...
            
            const current = counts.get(i) || [0, 0];
            
            // 0, [3, 1];
            current[n] += 1;

            counts.set(i, current);
        });
    });
    
    const answer = [];
    for (const [key, value] of counts.entries()) {
        answer[key] = value[0] > value[1] ? 0 : 1;
    }

    console.log(`Binary: ${answer.join('')} - Decimal ${parseInt(answer.join(''), 2)}`);
};

main().catch((err) => {
    console.error(err);
});