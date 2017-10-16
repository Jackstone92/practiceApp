import React from 'react';

import { Table } from 'semantic-ui-react'


export default CalendarItemsDisplay = () => {
  return(
    <div className="calendarItemsDisplay__wrapper">
      <Table
        celled
        selectable
        striped={true}
      className="calendarItemsDisplay__table">

        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Piece/Scale/List</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        
        <Table.Body>
          <Table.Row>
            <Table.Cell>8:00</Table.Cell>
            <Table.Cell>Für Elise</Table.Cell>
            <Table.Cell positive>Practice</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>14:00</Table.Cell>
            <Table.Cell>Für Elise</Table.Cell>
            <Table.Cell warning>Lesson</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>16:00</Table.Cell>
            <Table.Cell>Für Elise</Table.Cell>
            <Table.Cell negative>Exam</Table.Cell>
          </Table.Row>

        </Table.Body>
      </Table>
    </div>
  );
}
