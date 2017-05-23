import figlet from 'figlet';
import font from '../../node_modules/figlet/fonts/Standard.flf';

figlet.parseFont("Standard", font);

export default (text) => {
 return figlet.textSync(text, "Standard");
};
