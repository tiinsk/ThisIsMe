import React from 'react';
import AsciiFont from './ascii_font';

const Help = () => {
  return(
    <div className="console-help">
      <AsciiFont text="Help"/>
      <table>
        <tbody>
        <tr>
          <td className="command-col">Usage:</td>
          <td>&lt;cmd&gt;</td>
        </tr>
        <br/>
        <tr>
          <td className="command-col">where &lt;cmd&gt; is one of:</td>
          <td>introduction, education, workHistory, skills, projects, interests, contacts, all</td>
        </tr>
        <tr>
          <td className="command-col">--help</td>
          <td>Prints help</td>
        </tr>
        <tr>
          <td className="command-col">&lt;cmd&gt; -l fi|en</td>
          <td>Chooses language for command</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
};

export default Help;
