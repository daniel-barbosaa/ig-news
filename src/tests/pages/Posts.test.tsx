import {render, screen} from '@testing-library/react'
import { createClient} from '../../services/prismicio'
import Posts, {getStaticProps} from '../../pages/posts';

const posts = [
    {
        slug: 'my-new-post',
        title: 'My-new-post',
        excerpt: 'Post excerpt',
        updatedAt: '10 de abril'
    }
]

jest.mock('../../services/prismicio')

describe('Post page', () => {
    it('Renderização correta', () => {
        render(<Posts posts={posts} />)

        expect(screen.getByText("My-new-post")).toBeInTheDocument()
    })
    it('carregando dados corretos', async () => {
        const getPrismicClientMocked = createClient as jest.Mock;
    
        getPrismicClientMocked.mockReturnValueOnce({
            getAllByType: jest.fn().mockResolvedValueOnce([
            {
              uid: 'my-new-post',
              last_publication_date: '04-01-2021',
              data: {
                title: [
                  {
                    type: 'heading1',
                    text: 'My new post',
                  },
                ],
                content: [
                  {
                    type: 'paragraph',
                    text: 'Post excerpt',
                  },
                ],
              },
            },
          ]),
        });
    
        const response = await getStaticProps({});
    
        expect(response).toEqual(
          expect.objectContaining({
            props: {
              posts: [
                {
                  slug: 'my-new-post',
                  title: 'My new post',
                  excerpt: 'Post excerpt',
                  updatedAt: '01 de abril de 2021',
                },
              ],
            },
          })
        );
      });
    
})