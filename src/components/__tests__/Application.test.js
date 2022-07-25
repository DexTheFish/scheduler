import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  queryByText,
  queryByAltText,
  getByAltText,
  getByPlaceholderText,
  getAllByTestId,
  getByDisplayValue,
} from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  xit("renders without crashing", () => {
    render(<Application />);
  });

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    fireEvent.click(getByAltText(appointments[0], "Add"));
    fireEvent.change(
      getByPlaceholderText(appointments[0], /enter student name/i),
      {
        target: { value: "Lydia Miller-Jones" },
      }
    );
    fireEvent.click(getByAltText(appointments[0], "Sylvia Palmer"));
    fireEvent.click(getByText(appointments[0], "Save"));
    expect(getByText(appointments[0], "saving...")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointments[0], "Lydia Miller-Jones")
    );

    const day = getAllByTestId(container, "day").find((day) =>
      getByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  // the following two tests are unfinished. see activity "The Next Tests"

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));


    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "are you sure you want to delete that?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "deleting...")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Edit the appointment
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), { 
      target: { value: 'Archie Jughead' } });
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
    // 5. Verify that the spots remaining is unchanged
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

});
