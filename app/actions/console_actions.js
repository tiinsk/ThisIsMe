import {languageOptions} from '../i18n/languages';

export const ADD_COMMAND = 'ADD_COMMAND';

const COMMANDS = [
  "--help",
  "all",
  "introduction",
  "education",
  "workHistory",
  "skills",
  "projects",
  "interests",
  "contacts"
];

export function addCommand(command){
  return{
    type: ADD_COMMAND,
    command
  }
}

export function addErrorCommand(){
  return{
    type: ADD_COMMAND,
    command: {
      command: "error"
    }
  }
}

export function parseCommand(command){
  return (dispatch) => {
    const commandArray = command.split(" ");
    const mainCommand = commandArray[0];
    if(commandArray.length > 3){
      dispatch(addErrorCommand());
    }
    if(COMMANDS.some(cmnd => cmnd === mainCommand)){
      const command = {
        command: mainCommand,
        language: "en"
      };
      if(commandArray[1] === "-l" && commandArray[2] && Object.keys(languageOptions).some(lang => lang === commandArray[2])){
        command.language = commandArray[2];
      }
      else if(commandArray[1]){
        dispatch(addErrorCommand());
      }
      dispatch(addCommand(command));
    }
    else {
      dispatch(addErrorCommand());
    }
  }
}
