            >
              🌙
            </span>
          ))}
          <span
            onClick={() => setRating(6)}
            style={{
              cursor: 'pointer',
              color: rating === 6 ? 'yellow' : 'gray',
            }}
          >
            👨
          </span>
        </div>
      </div>
      <button onClick={handleSubmit}>Add Play</button>
    </div>
  );
};

export default InputSection;
