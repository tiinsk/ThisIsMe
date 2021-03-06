import _ from 'lodash';
import {languageOptions} from '../i18n/languages';

export const ADD_COMMAND = 'ADD_COMMAND';

export const commands = {
  Introduction: 'introduction',
  Education: 'education',
  WorkHistory: 'workHistory',
  Skills: 'skills',
  Projects: 'projects',
  Interests: 'interests',
  Contacts: 'contacts',
};

export const helpCommand = 'help';
export const allCommand = 'all';

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
      command: 'error'
    }
  }
}

export function parseCommand(command){
  return (dispatch) => {
    const commandArray = command.split(/\s+/);
    const mainCommand = commandArray[0];
    if(commandArray.length > 3){
      dispatch(addErrorCommand());
    }
    if(_.some({...commands, helpCommand, allCommand}, cmnd => cmnd === mainCommand)){
      const command = {
        command: mainCommand,
        language: 'en'
      };
      if(commandArray[1] === '-l' && commandArray[2] && Object.keys(languageOptions).some(lang => lang === commandArray[2])){
        command.language = commandArray[2];
      }
      else if(commandArray[1]){
        dispatch(addErrorCommand());
        return;
      }
      dispatch(addCommand(command));
    }
    else {
      dispatch(addErrorCommand());
    }
  }
}
