import React from 'react';

import {allCommand, commands, helpCommand} from '../../../actions/console_actions';
import {addAllTranslations} from '../../main/translate';
import AsciiFont from './ascii-font';
import Contacts from './contacts';
import Education from './education';
import Help from './help';
import Interests from './interests';
import Introduction from './introduction';
import Projects from './projects';
import Skills from './skills';
import WorkHistory from './work-history';

const Command = ({command, allStrings}) => {
  let CommandBody = undefined;
  switch (command.command) {
    case helpCommand:
      return <Help/>;
    case allCommand:
      const allCommands = [
        {
          command: commands.Introduction,
          body: Introduction
        },
        {
          command: commands.WorkHistory,
          body: WorkHistory
        },
        {
          command: commands.Education,
          body: Education
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
            allCommands.map((cmd, i) => {
              return (
                <div key={i}>
                  {getCommand(cmd.body, allStrings, {command: cmd.command, language: command.language})}
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
        <div style={{margin: '1rem'}}>command not recognized, try typing "{helpCommand}"</div>
      );
  }

  return getCommand(CommandBody, allStrings, command);
};

const getCommand = (CommandBody, allStrings, command) => {
  return (
    <div>
      <AsciiFont text={allStrings[command.language].titles[command.command]}/>
      <div style={{marginLeft: '1rem'}}>
        <CommandBody
          strings={allStrings[command.language]}
        />
      </div>
    </div>
  )
};


export default addAllTranslations(Command);
