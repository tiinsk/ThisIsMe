import {map, values, keys} from 'lodash';
import React from 'react';
import styled from 'styled-components/macro';

import {allCommand, commands, helpCommand} from '../../../actions/console_actions';
import AsciiFont from './ascii-font';

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
  return (
    <StyledConsoleHelp>
      <AsciiFont text="Help"/>
      <table>
        <tbody>
        <tr>
          <td className="command-col">Usage:</td>
          <td>&lt;cmd&gt;</td>
        </tr>
        <tr>
          <td><br/></td>
        </tr>
        <tr>
          <td className="command-col">where &lt;cmd&gt; is one of:</td>
          <td>
            {
              map(values(commands), (cmd, i) => `${cmd}${i < keys(commands).length - 1 ? ', ' : ''}`)
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
