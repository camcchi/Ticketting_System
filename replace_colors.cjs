const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
        }
    });
    return results;
}

const files = walk('C:/Users/One/Downloads/Ticket-System-UI/src/app');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content.replace(/#02153D/gi, '#137A87');
    newContent = newContent.replace(/#01976F/gi, '#4CC9B5');
    newContent = newContent.replace(/#4A277A/gi, '#8ED1C9');
    newContent = newContent.replace(/#00EED0/gi, '#8ED1C9');
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated ${file}`);
    }
});
