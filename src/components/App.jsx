import { Component } from 'react';
import Modal from './Modal/Modal';
import { fetchDetails, fetchPosts } from 'services/api';
import { ThreeCircles } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

export class App extends Component {
  state = {
    modal: {
      isOpen: false,
      visibleData: null,
    },
    posts: [],
    isLoading: false,
    error: null,
    selectedPostId: null,
  };

  onOpenModal = data => {
    this.setState({
      modal: {
        isOpen: true,
        visibleData: data,
      },
    });
  };

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        visibleData: null,
      },
    });
  };

  onSelectPostId = postId => {
    this.setState({ selectedPostId: postId });
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const posts = await fetchPosts();

      this.setState({ posts });
      toast.success('Your posts were successfully fetched!', toastConfig);
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(error.message, toastConfig);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.modal.isOpen !== this.state.modal.isOpen) {
      console.log('OPEN or CLOSED modal');
    }

    if (prevState.selectedPostId !== this.state.selectedPostId) {
      try {
        this.setState({ isLoading: true });
        const postDetails = await fetchDetails(this.state.selectedPostId);
        this.setState({ modal: { isOpen: true, visibleData: postDetails } });
        toast.success('Post details were successfully fetched!', toastConfig);

        console.log('postDetails', postDetails);
      } catch (error) {
        this.setState({ error: error.message });
        toast.error(error.message, toastConfig);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    return (
      <div>
        <h1 className="title-app">React</h1>
        {this.state.modal.isOpen && (
          <Modal
            onCloseModal={this.onCloseModal}
            visibleData={this.state.modal.visibleData}
          />
        )}
        {this.state.error !== null && <p className="c-error"> Oops, error.</p>}
        {this.state.isLoading && (
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#04e4f9"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}

        {this.state.posts.length > 0 &&
          this.state.posts.map(post => {
            return (
              <button
                onClick={() => this.onSelectPostId(post.id)}
                className="post"
                key={post.id}
              >
                <strong className="post-id">Id: {post.id}</strong>
                <h4 className="post-title"> {post.title} </h4>
                <p className="post-body">{post.body}</p>
              </button>
            );
          })}
      </div>
    );
  }
}
