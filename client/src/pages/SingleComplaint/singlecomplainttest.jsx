<Grid item xs={12} md={6}>
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {complaintComments.map((comment) => (
                <div key={comment._id}>
                     <DisplayAllComments comment={comment} />
                     </div>
              ))}
                  {currentUser === comment.author ? (
                    <>
                      <Button onClick={handleOpen}>Edit</Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                      >
                        <Box sx={{ ...style, width: 400 }}>
                          <h2 id="parent-modal-title">Text in a modal</h2>
                          <EditCommentForm commentDescription = {comment.description} />
                        </Box>
                      </Modal>
                     
                    </>
                  ) : (
                    <div></div>
                  )}
                
             
            </div>
          )}
        </div>
        {Auth.loggedIn() ? (
          <button onClick={openModal} className="make-complaint-button">
            Add a comment
          </button>
        ) : (
          <p>
            You need to be logged in to add a comment. Please{" "}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
        {isModalOpen && (
          <CommentForm
            closeModal={closeModal}
            singleComplaint={singleComplaint}
          />
        )}
      </Grid>