import React from 'react';
import AsciiFont from './ascii_font';

import {addAllTranslations, translateToLanguage} from '../../../translate';

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
    case "--help":
      return <Help/>;
    case "all":
      const allCommands = [
        {
          command: "introduction",
          body: Introduction
        },
        {
          command: "education",
          body: Education
        },
        {
          command: "workHistory",
          body: WorkHistory
        },
        {
          command: "skills",
          body: Skills
        },
        {
          command: "projects",
          body: Projects
        },
        {
          command: "interests",
          body: Interests
        },
        {
          command: "contacts",
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
    case "introduction":
      CommandBody = Introduction;
      break;
    case "education":
      CommandBody = Education;
      break;
    case "workHistory":
      CommandBody = WorkHistory;
      break;
    case "skills":
      CommandBody = Skills;
      break;
    case "projects":
      CommandBody = Projects;
      break;
    case "interests":
      CommandBody = Interests;
      break;
    case "contacts":
      CommandBody = Contacts;
      break;
    default:
      return (
        <div style={{margin: "1rem"}}>command not recognized, try typing --help</div>
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
