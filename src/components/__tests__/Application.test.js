import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getByAltText, getByPlaceholderText, getAllByTestId, prettyDOM } from "@testing-library/react";

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
    // Render the Application.
    // Wait until the text "Archie Cohen" is displayed.
    // Click the "Add" button on the first empty appointment.
    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    // Click the first interviewer in the list.
    // Click the "Save" button on that same appointment.
    // Check that the element with the text "Saving" is displayed.
    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment");
    // console.log(appointments);
    // console.log(prettyDOM(appointments));
    // console.log(prettyDOM(appointments[0]));
    fireEvent.click(getByAltText(appointments[0], "Add"));

    fireEvent.change(getByPlaceholderText(appointments[0], /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointments[0], "Sylvia Palmer"));

    fireEvent.click(getByText(appointments[0], "Save"));

    // If we see act() warnings, it is because we are causing the component to update when we click the "Save" button. We need to allow the component to finish the operation and then verify that the expected behaviour occurs. We can continue to ignore these warnings while we build this test as long as it continues to pass.
  });


})
