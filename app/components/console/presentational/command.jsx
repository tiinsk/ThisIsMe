import React from 'react';
import AsciiFont from './ascii_font';

import {addAllTranslations, translateToLanguage} from '../../main/translate';
import {commands, helpCommand} from '../../../actions/console_actions';

import Introduction from './introduction';
import Education from './education';
import WorkHistory from './work_history';
import Skills from './skills';
import Projects from './projects';
import Contacts from './contacts';
import Interests from './interests';
import Help from './help';

const Command = ({command, allStrings}) => {
  let CommandBody = undefined;
  switch (command.command){
    case helpCommand:
      return <Help/>;
    case commands.All:
      const allCommands = [
        {
          command: commands.Introduction,
          body: Introduction
        },
        {
          command: commands.Education,
          body: Education
        },
        {
          command: commands.WorkHistory,
          body: WorkHistory
        },
        {
          command: commands.Skills,
          body: Skills
        },
        {
          command: commands.Projects,
          body: Projects
        },
        {
          command: commands.Interests,
          body: Interests
        },
        {
          command: commands.Contacts,
          body: Contacts
        }
      ];
      return (
        <div>
          {
            allCommands.map((cmd,i) => {
              return (
                <div key={i}>
                  { getCommand(cmd.body, allStrings, {command: cmd.command, language: command.language}) }
                </div>
              );
            })
          }
        </div>
      );
    case commands.Introduction:
      CommandBody = Introduction;
      break;
    case commands.Education:
      CommandBody = Education;
      break;
    case commands.WorkHistory:
      CommandBody = WorkHistory;
      break;
    case commands.Skills:
      CommandBody = Skills;
      break;
    case commands.Projects:
      CommandBody = Projects;
      break;
    case commands.Interests:
      CommandBody = Interests;
      break;
    case commands.Contacts:
      CommandBody = Contacts;
      break;
    default:
      return (
        <div style={{margin: "1rem"}}>command not recognized, try typing "{helpCommand}"</div>
      );
  }

  return getCommand(CommandBody, allStrings, command);
};

const getCommand = (CommandBody, allStrings, command) => {
  return(
    <div>
      <AsciiFont text={allStrings[command.language].titles[command.command]}/>
      <div style={{marginLeft: "1rem"}}>
        <CommandBody
          strings={allStrings[command.language]}
        />
      </div>
    </div>
  )
};


export default addAllTranslations(Command);
