import { render, screen } from "@testing-library/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { createClient } from "../../services/prismicio";
import { getSession } from "next-auth/react";

const post = {
  slug: "my-new-post",
  title: "My-new-post",
  content: "<p>Post excerpt</p>",
  updatedAt: "10 de abril",
};

jest.mock("../../services/prismicio");
jest.mock("next-auth/react");

describe("Posts page", () => {
  it("Renderização correta", () => {
    render(<Post post={post} />);

    expect(screen.getByText("My-new-post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
  });
  it("Redirecionamento se usuário não tem uma inscrição", async () => {
    const getSessionMocked = getSession as any;
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    });

    const response = await getServerSideProps({
      params: { slug: "my-slug-text" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: "/",
          permanent: false,
        },
      })
    );
  });

  it("carrega dados inicial", async () => {
    const getSessionMocked = getSession as any;
    const getPrismicClientMocked = createClient as jest.Mock;

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "fake-active-subscription",
    });

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {
              type: "heading1",
              text: "My new post",
            },
          ],
          content: [
            {
              type: "paragraph",
              text: "Post content",
            },
          ],
        },
        last_publication_date: "04-01-2021",
      }),
    });

    const response = await getServerSideProps({
      params: { slug: "my-new-post" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-post",
            title: "My new post",
            content: "<p>Post content</p>",
            updatedAt: "01 de abril de 2021",
          },
        },
      })
    );
  });
});
