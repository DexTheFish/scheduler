import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, queryByText, queryByAltText, getByAltText, getByPlaceholderText, getAllByTestId, prettyDOM } from "@testing-library/react";

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

    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment");
    fireEvent.click(getByAltText(appointments[0], "Add"));

    fireEvent.change(getByPlaceholderText(appointments[0], /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointments[0], "Sylvia Palmer"));

    fireEvent.click(getByText(appointments[0], "Save"));
    expect(getByText(appointments[0], "saving...")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointments[0], "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
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
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    // 5. Click the "Confirm" button on the confirmation.
    // 6. Check that the element with the text "Deleting" is displayed.
    // 7. Wait until the element with the "Add" button is displayed.
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  
    debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", () => {
    // insert test here...
  });
})
