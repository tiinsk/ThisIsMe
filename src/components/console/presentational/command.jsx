import React from 'react';

import {
  allCommand,
  commands,
  helpCommand,
} from '../../../actions/console_actions';
import AsciiFont from './ascii-font';
import Contacts from './contacts';
import Education from './education';
import Help from './help';
import Interests from './interests';
import Introduction from './introduction';
import Projects from './projects';
import Skills from './skills';
import WorkHistory from './work-history';

const Command = ({ command, data }) => {
  let CommandBody = undefined;
  let title = undefined;
  switch (command.command) {
  case helpCommand:
    return <Help />;
  case allCommand:
    const allCommands = [
      {
        command: commands.Introduction,
        body: Introduction,
        title: data[command.language].header.title,
      },
      {
        command: commands.WorkHistory,
        body: WorkHistory,
        title: data[command.language].workHistory.title,
      },
      {
        command: commands.Education,
        body: Education,
        title: data[command.language].education.title,
      },
      {
        command: commands.Skills,
        body: Skills,
        title: data[command.language].skills.title,
      },
      {
        command: commands.Projects,
        body: Projects,
        title: data[command.language].projects.title,
      },
      {
        command: commands.Interests,
        body: Interests,
        title: data[command.language].interests.title,
      },
      {
        command: commands.Contacts,
        body: Contacts,
        title: data[command.language].contacts.title,
      },
    ];
    return (
      <div>
        {allCommands.map((cmd, i) => {
          return (
            <div key={i}>
              {getCommand(cmd.body, cmd.title, data, {
                command: cmd.command,
                language: command.language,
              })}
            </div>
          );
        })}
      </div>
    );
  case commands.Introduction:
    CommandBody = Introduction;
    title = data[command.language].header.title;
    break;
  case commands.Education:
    CommandBody = Education;
    title = data[command.language].education.title;
    break;
  case commands.WorkHistory:
    CommandBody = WorkHistory;
    title = data[command.language].workHistory.title;
    break;
  case commands.Skills:
    CommandBody = Skills;
    title = data[command.language].skills.title;
    break;
  case commands.Projects:
    CommandBody = Projects;
    title = data[command.language].projects.title;
    break;
  case commands.Interests:
    CommandBody = Interests;
    title = data[command.language].interests.title;
    break;
  case commands.Contacts:
    CommandBody = Contacts;
    title = data[command.language].contacts.title;
    break;
  default:
    return (
      <div style={{ margin: '1rem' }}>
          command not recognized, try typing "{helpCommand}"
      </div>
    );
  }

  return getCommand(CommandBody, title, data, command);
};

const getCommand = (CommandBody, title, data, command) => {
  return (
    <div>
      <AsciiFont text={title} />
      <div style={{ marginLeft: '1rem' }}>
        <CommandBody data={data[command.language]} />
      </div>
    </div>
  );
};

export default Command;
