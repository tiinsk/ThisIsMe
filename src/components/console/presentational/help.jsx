import React from 'react';
import AsciiFont from './ascii_font';
import _ from 'lodash';

import {commands, helpCommand, allCommand} from '../../../actions/console_actions';
import styled from 'styled-components/macro';

const StyledConsoleHelp = styled.div`
  table{
    padding: 0 2rem;
    width: 100%;
  }
  .command-col{
    width: 24rem;
  }
`;

const Help = () => {
  return(
    <StyledConsoleHelp>
      <AsciiFont text="Help"/>
      <table>
        <tbody>
        <tr>
          <td className="command-col">Usage:</td>
          <td>&lt;cmd&gt;</td>
        </tr>
        <tr><td><br/></td></tr>
        <tr>
          <td className="command-col">where &lt;cmd&gt; is one of:</td>
          <td>
            {
              _.map(_.values(commands), (cmd,i) => `${cmd}${i < _.keys(commands).length - 1 ? ", " : ""}`)
            }
             <br/> OR {allCommand} (which prints all commands)
          </td>
        </tr>
        <tr>
          <td><br/></td>
        </tr>
        <tr>
          <td className="command-col">{helpCommand}</td>
          <td>Prints help</td>
        </tr>
        <tr>
          <td className="command-col">&lt;cmd&gt; -l fi|en</td>
          <td>Chooses language for command</td>
        </tr>
        </tbody>
      </table>
    </StyledConsoleHelp>
  )
};

export default Help;
