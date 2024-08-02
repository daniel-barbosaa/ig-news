import { render, screen } from "@testing-library/react";
import { createClient } from "../../services/prismicio";
import { SessionProvider } from "next-auth/react";
import PreviewPost, {getStaticProps} from "../../pages/posts/preview/[slug]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const post = {
  slug: "my-new-post",
  title: "My new post",
  content: "<p>Post excerpt</p>",
  updatedAt: "10 de abril",
};

jest.mock('next-auth/react')
jest.mock("../../services/prismicio");
jest.mock("next-auth/react");
jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

describe("Posts preview page", () => {
  it("Renderização correta", () => {
    const useSessionMocked = useSession as jest.Mock
    
    useSessionMocked.mockReturnValueOnce({
        data: null,
        status: 'unauthenticated',
    });

    render(
          <PreviewPost post={post} />
    );

    expect(screen.getByText("My new post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("Redirecionamento usuário para o post completo se tem uma inscrição", async () => {
    const useSessionMocked = useSession as jest.Mock 
    const useRouterMocked = useRouter as jest.Mock
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce({
        data: {
            activeSubscription: 'fake-active-subscription'
        },
    });
    
    useRouterMocked.mockReturnValueOnce({
        push: pushMock
    })

    render(
        <PreviewPost post={post} />
    );
    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
        
  });

  it("carrega dados inicial", async () => {
   
    const getPrismicClientMocked = createClient as jest.Mock;

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

    const response = await getStaticProps({
        params: {
            slug: 'my-new-post'
        }
    })

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
