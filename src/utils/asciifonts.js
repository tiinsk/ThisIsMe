import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js'

figlet.parseFont('Standard', standard);

export default (text) => {
 return figlet.textSync(text, 'Standard');
};
