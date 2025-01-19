import React from 'react';
import './LogInfo.css';

interface LogInfoProps {
  selectedItems: number[];
}

const LogInfo: React.FC<LogInfoProps> = ({ selectedItems }) => {
  return (
    <div className="log-info">
      <b>Logs</b>
      <table>
        <thead>
          <tr>
            <th>LogType</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Selected Items</td>
            <td>{selectedItems.join(', ')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LogInfo;
