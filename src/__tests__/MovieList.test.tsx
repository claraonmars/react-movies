import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import MovieList from "../components/MovieList";

const mockMovies = [
  {
    genre: "Action",
    image: "movie1.jpg",
    name: "Deadpool",
    productionYear: 2016,
    synopsis:
      "Wade Wilson is a dishonorably discharged special forces operative working as a mercenary when he meets Vanessa, a prostitute. They become romantically involved, and a year later she accepts his marriage proposal. Wilson is diagnosed with terminal cancer, and leaves Vanessa without warning so she will not have to watch him die.<br /><br />A mysterious recruiter approaches Wilson, offering an experimental cure for his cancer. He is taken to Ajax and Angel Dust, who inject him with a serum designed to awaken latent mutant genes. They subject Wilson to days of torture to induce stress and trigger any mutation he may have, without success. When Wilson discovers Ajax's real name is Francis and mocks him for it, Ajax leaves Wilson in a hyperbaric chamber that periodically takes him to the verge of asphyxiation over a weekend. This finally activates a superhuman healing ability that cures the cancer but leaves Wilson severely disfigured with burn-like scars over his entire body. He escapes from the chamber and attacks Ajax but relents when told that his disfigurement can be cured. Ajax subdues Wilson and leaves him for dead in the now-burning laboratory.<br /><br />Wilson survives and seeks out Vanessa. He does not reveal to her he is alive fearing her reaction to his new appearance. After consulting with his best friend Weasel, Wilson decides to hunt down Ajax for the cure. He becomes a masked vigilante, adopting the name 'Deadpool' (from Weasel picking him in a dead pool), and moves into the home of an elderly blind woman named Al. He questions and murders many of Ajax's men until one, the recruiter, reveals his whereabouts. Deadpool intercepts Ajax and a convoy of armed men on an expressway. He kills everyone but Ajax, and demands the cure from him but the X-Man Colossus and his trainee Negasonic Teenage Warhead interrupt him. Colossus wants Deadpool to mend his ways and join the X-Men. Taking advantage of this distraction, Ajax escapes. He goes to Weasel's bar where he learns of Vanessa.<br /><br />Ajax kidnaps Vanessa and takes her to a decommissioned helicarrier in a scrapyard. Deadpool convinces Colossus and Negasonic to help him. They battle Angel Dust and several soldiers while Deadpool fights his way to Ajax. During the battle, Negasonic accidentally destroys the equipment stabilizing the helicarrier. Deadpool protects Vanessa from the collapsing ship, while Colossus carries Negasonic and Angel Dust to safety. Ajax attacks Deadpool again but is overpowered. He reveals there is no cure after all and, despite Colossus's pleading, Deadpool kills him. He promises to try to be more heroic moving forward. Though Vanessa is angry with Wilson for leaving her, she reconciles with him.",
    synopsisShort:
      "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
  },
];

describe("<MovieList />", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test("should display list of movies", async () => {
    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <MovieList movies={mockMovies} />
      </Router>
    );
    expect(getByText("Deadpool")).toBeInTheDocument();
  });

  test("should display empty message", async () => {
    const { getByText } = render(<MovieList movies={[]} />);
    expect(getByText("Try Again")).toBeInTheDocument();
  });
});
